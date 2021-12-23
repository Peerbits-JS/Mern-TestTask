import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";

import Loader from "../components/Loader/Loader";
import { formatDate, getFromAndToDate } from "../util/utils";

import { getPosts } from "../redux/action";
import { Store, Events } from "../redux/Actions";

const FILTER_OPTIONS = {
  NONE: 0,
  YESTERDAY: 1,
  LAST_WEEK: 2,
  LAST_MONTH: 3,
  CUSTOM: 5
};

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state: Store) => state.userDataReducer.posts);
  const loading = useSelector((state: Store) => state.userDataReducer.loading);
  const [postKeys, setpostKeys] = useState<string[]>([]);
  const [post, setpost] = useState<any[]>([]);
  const [filterOptions, setfilterOptions] = useState({
    type: 0,
    fromDate: formatDate(new Date()),
    toDate: formatDate(new Date())
  });
  const [isCustomDate, setIsCustomDate] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    formatePostData(posts);
  }, [posts]);

  useEffect(() => {
    setIsDataEmpty(false);
    if (filterOptions.type === FILTER_OPTIONS.NONE) {
      if (Object.values(posts).length <= 0) {
        setIsDataEmpty(true);
      }
      formatePostData(posts);
    } else if (filterOptions.type !== FILTER_OPTIONS.CUSTOM) {
      filterPost();
    }
  }, [filterOptions, posts]);

  const filterPost = () => {
    const fromDate = filterOptions.fromDate;
    const toDate = filterOptions.toDate;

    if (
      !moment(fromDate).isSame(toDate) &&
      moment(fromDate).isAfter(toDate) &&
      isCustomDate
    ) {
      toast.error("ToDate must be after fromDate");
    }

    const filteredPosts: any = [];
    let allPost: { [key: string]: any } = {};
    allPost = posts;

    Object.keys(posts).map((pkey: any) => {
      const tmpEvent: Events[] = [];
      allPost[pkey].events.map((ev: Events) => {
        if (
          moment(ev.date).isAfter(fromDate) &&
          moment(ev.date).isBefore(toDate)
        ) {
          tmpEvent.push(ev);
        }
        return 0;
      });

      const isData = Object.keys(tmpEvent).length <= 0 || isDataEmpty;
      setIsDataEmpty(isData);

      filteredPosts[pkey] = { events: [] };
      filteredPosts[pkey].events = tmpEvent;
      filteredPosts[pkey].division = pkey;
      return 0;
    });

    formatePostData(filteredPosts);
  };

  const formatePostData = (posts: any) => {
    setpost(posts);
    const postKeys = Object.keys(posts) || [];
    setpostKeys(postKeys);
  };

  const onFilterChange = (filterOption: any) => {
    setIsCustomDate(false);

    let date = {
      fromDate: formatDate(new Date()),
      toDate: formatDate(new Date())
    };

    if (filterOption === FILTER_OPTIONS.YESTERDAY) {
      date = getFromAndToDate(1);
    } else if (filterOption === FILTER_OPTIONS.LAST_MONTH) {
      date = getFromAndToDate(30);
    } else if (filterOption === FILTER_OPTIONS.LAST_WEEK) {
      date = getFromAndToDate(7);
    } else if (filterOption === FILTER_OPTIONS.CUSTOM) {
      setIsCustomDate(true);
    }
    setfilterOptions({
      type: filterOption,
      fromDate: date.fromDate,
      toDate: date.toDate
    });
  };

  return (
    <div className="p-3">
      {loading
        ? (<Loader />)
        : (<>
          <div className="d-flex align-items-center mb-4">
            <div className="ml-2">
              <select
                onChange={(e) => {
                  onFilterChange(parseInt(e.target.value));
                }}
                value={filterOptions.type}
                className="form-select"
                aria-label="Default select example"
              >
                <option selected value={0} >Date Filter Options (All)</option>
                <option value={1}>Yesterday</option>
                <option value={2}>Last Week</option>
                <option value={3}>Last Month</option>
                <option value={5}>Custom</option>
              </select>
            </div>
            {isCustomDate
              ? (<>
                <div className="ml-2">
                  <div className="form-inline">
                    <label className="mr-2">From Date: </label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleInputEmail1"
                      value={filterOptions.fromDate}
                      onChange={(e) => {
                        setfilterOptions({
                          ...filterOptions,
                          fromDate: e.target.value
                        });
                      }}
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div className="ml-2">
                  <div className="form-inline">
                    <label className="mr-2">To Date: </label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={filterOptions.toDate}
                      onChange={(e) => {
                        setfilterOptions({
                          ...filterOptions,
                          toDate: e.target.value
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="ml-2">
                  <Button className="ml-2" onClick={filterPost} size="sm">
                    Apply
                  </Button>
                </div>
              </>
              )
              : null}
          </div>

          {isDataEmpty
            ? (<h1>No Posts found</h1>)
            : (
              <>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Titile</th>
                      <th>Date</th>
                      <th>Note</th>
                      <th>Bunting</th>
                      <th>Division</th>
                    </tr>
                  </thead>
                  <tbody>
                    {postKeys &&
                      postKeys.map((pkey: any) => {
                        return (
                          <>
                            {post[pkey].events.map((ev: any, index: any) => (
                              <tr key={`${index + "-" + ev.title}`}>
                                <td>{ev.title}</td>
                                <td>{ev.date}</td>
                                <td>{ev.notes || "NA"}</td>
                                <td>{ev.bunting ? "Yes" : " No"}</td>
                                <td>{post[pkey].division}</td>
                              </tr>
                            ))}
                          </>
                        );
                      })}
                  </tbody>
                </Table>
              </>
            )}
        </>
        )}
    </div>
  );
}
