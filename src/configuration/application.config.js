"use strict";
exports.__esModule = true;
exports.ApplicationConfig = void 0;
var logger_1 = require("../services/logger");
var log = logger_1.getLogger('application.config');
var ApplicationConfig = /** @class */ (function () {
    function ApplicationConfig() {
    }
    ApplicationConfig.registerRoute = function (app) {
        app.get('/', function (req, res) {
            res.json('Hello');
        });
        // app.use('/auth/users', authenticateClassObject.middleWare, UserAuthRoute);
        // app.use('/users', UserRoute); // when user do not have auth token
        // app.use('/directline', DirectLineRoute);
        // app.use('/apitool', apitoolRoute);
        // app.use('/saas', gatewayRoutes);
        // app.use('/fi', FIRoute);
        // app.use('/flowbuilder', FlowRoute);
        // app.use('/flowFolder', FlowFolderRoute);
        // app.use('/rules', ScheduleMessageRoute);
        // app.use('/dataengine', botUserFIRoute);
        // app.use('/flowExecutor', flowExecutorRoute);
        // app.use('/user-profiling', UserProfilingRoute);
        // app.use('/botsetting', BotSettingsRoute);
        // app.use('/botbackup', backupRestoreRoute);
        // app.use('/df-intents', DfIntentRoute);
        // app.use('/df-entity', DfEntityRoute);
        // app.use('/knowledge-base', KnowledgeBaseRoute);
        // app.use('/df-training', FallbackTrainingRoute);
        // app.use('/intent-folder', IntentFolderRoute);
        // app.use('/nlp', authenticateClassObject.middleWare, NLPRoute);
        // app.use('/org', organizationRoute);
        // app.use('/handoff/v2', handoffRoute);
        // app.use('/bdk', bdkRouteV4);
        // app.use('/analytics', AnalyticsRoute);
        // app.use('/analytics/bdk/v4/', analyticsBdkV4Router); // route to update analytics from bdk
        // app.use('/utterance', UtteranceGeneratorRoute);
        // app.use('/form', FormRoutes);
        // app.use('/migrate', authenticateClassObject.migrationMiddleware, migrationRoutes);
        // app.use('/growth-tool', GrowthToolRoute);
        // app.use('/tag', TagRoute);
        // app.use('/whatsapp-widget', WhatsAppWidgetRoute);
        // app.use('/department', DepartmentRoute);
        // app.use('/notes', NotesRoute);
        // app.use('/transcript', TranscriptRoute);
        // app.use('/GDPR', GDPRRoute);
        // app.use('/search', ContentSearchRoute);
        // app.use('/audit-log', AuditRoute);
        // app.use('/voximplant', VoximplantRoute);
        // app.use('/templateMessage', TemplateMessagesRoute);
    };
    return ApplicationConfig;
}());
exports.ApplicationConfig = ApplicationConfig;
