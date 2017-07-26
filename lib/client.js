// client.js - node-zendesk client initialization
'use strict';

var parts = [
      'Users', 'Tickets', 'TicketAudits', 'TicketFields', 'TicketMetrics', 'TicketImport', 'TicketExport', 
      'Views', 'Requests', 'UserIdentities', 'Groups', 'GroupMemberships',
      'CustomAgentRoles', 'Organizations', 'Search', 'Tags', 'Forums',
      'ForumSubscriptions', 'Categories', 'Topics', 'TopicComments',
      'TopicSubscriptions', 'TopicVotes', 'AccountSettings',
      'ActivityStream', 'Attachments', 'JobStatuses', 'Locales',
      'Macros', 'SatisfactionRatings', 'SuspendedTickets', 'UserFields',
      'OrganizationFields', 'OauthTokens', 'Triggers', 'SharingAgreement',
      'Brand', 'OrganizationMemberships', 'DynamicContent', 'TicketEvents',
      'Imports', 'Targets', 'Sessions', 'Installations'
    ],
    helpcenterParts = [
      'Articles', 'Sections', 'Categories', 'Translations',
      'ArticleComments', 'ArticleLabels', 'ArticleAttachments',
      'Votes', 'Search', 'AccessPolicies', 'Subscriptions'
    ],
    voiceParts = [
      'PhoneNumbers', 'GreetingCategories', 'Greetings', 'CurrentQueueActivity',
      'HistoricalQueueActivity', 'AgentActivity', 'Availabilities'
    ];

exports.createClient = function (options) {
  var nconf = require('nconf'),
      store = new nconf.Provider();
  nconf.use('memory');
  if (true !== options.disableGlobalState) {
    nconf.env().argv({
      's': {
        alias: 'subdomain'
      },
      'u': {
        alias: 'username'
      },
      'p': {
        alias: 'password'
      },
      't': {
        alias: 'token'
      },
      'r': {
        alias: 'remoteUri'
      },
      'hc': {
        alias: 'helpcenter'
      },
      'v': {
        alias: 'voice'
      }
    });
  }

  options = store.defaults(options);

  if (nconf.get('subdomain')) {
    var endpoint;
    if (options.stores.defaults.store.helpcenter) {
      endpoint = '.zendesk.com/api/v2/help_center';
    } else if (options.stores.defaults.store.voice){
      endpoint = '.zendesk.com/api/v2/channels/voice';
    } else {
      endpoint = '.zendesk.com/api/v2';
    }
    options.stores.defaults.store.remoteUri = 'https://' + nconf.get('subdomain') + endpoint;
  }

  var client = {}, partsToAdd, clientPath;

  if (options.stores.defaults.store.helpcenter) {
    partsToAdd = helpcenterParts;
    clientPath = './client/helpcenter/';
  } else if (options.stores.defaults.store.voice) {
    partsToAdd = voiceParts;
    clientPath = './client/voice/';
  } else {
    partsToAdd = parts;
    clientPath = './client/';
  }

  exports['Users'] = require('./client/users')['Users'];
  client['users'] = new exports['Users'](options);
  client['users'].on('debug::request',  debug);
  client['users'].on('debug::response', debug);

  exports['Tickets'] = require('./client/tickets')['Tickets'];
  client['tickets'] = new exports['Tickets'](options);
  client['tickets'].on('debug::request',  debug);
  client['tickets'].on('debug::response', debug);

  exports['TicketAudits'] = require('./client/ticketaudits')['TicketAudits'];
  client['ticketaudits'] = new exports['TicketAudits'](options);
  client['ticketaudits'].on('debug::request',  debug);
  client['ticketaudits'].on('debug::response', debug);

  exports['TicketFields'] = require('./client/ticketfields')['TicketFields'];
  client['ticketfields'] = new exports['TicketFields'](options);
  client['ticketfields'].on('debug::request',  debug);
  client['ticketfields'].on('debug::response', debug);

  exports['TicketMetrics'] = require('./client/ticketmetrics')['TicketMetrics'];
  client['ticketmetrics'] = new exports['TicketMetrics'](options);
  client['ticketmetrics'].on('debug::request',  debug);
  client['ticketmetrics'].on('debug::response', debug);

  exports['TicketImport'] = require('./client/ticketimport')['TicketImport'];
  client['ticketimport'] = new exports['TicketImport'](options);
  client['ticketimport'].on('debug::request',  debug);
  client['ticketimport'].on('debug::response', debug);

  exports['TicketExport'] = require('./client/ticketexport')['TicketExport'];
  client['ticketexport'] = new exports['TicketExport'](options);
  client['ticketexport'].on('debug::request',  debug);
  client['ticketexport'].on('debug::response', debug);

  exports['Views'] = require('./client/views')['Views'];
  client['views'] = new exports['Views'](options);
  client['views'].on('debug::request',  debug);
  client['views'].on('debug::response', debug);

  exports['Requests'] = require('./client/requests')['Requests'];
  client['requests'] = new exports['Requests'](options);
  client['requests'].on('debug::request',  debug);
  client['requests'].on('debug::response', debug);

  exports['UserIdentities'] = require('./client/useridentities')['UserIdentities'];
  client['useridentities'] = new exports['UserIdentities'](options);
  client['useridentities'].on('debug::request',  debug);
  client['useridentities'].on('debug::response', debug);

  exports['Groups'] = require('./client/groups')['Groups'];
  client['groups'] = new exports['Groups'](options);
  client['groups'].on('debug::request',  debug);
  client['groups'].on('debug::response', debug);

  exports['GroupMemberships'] = require('./client/groupmemberships')['GroupMemberships'];
  client['groupmemberships'] = new exports['GroupMemberships'](options);
  client['groupmemberships'].on('debug::request',  debug);
  client['groupmemberships'].on('debug::response', debug);

  exports['CustomAgentRoles'] = require('./client/customagentroles')['CustomAgentRoles'];
  client['customagentroles'] = new exports['CustomAgentRoles'](options);
  client['customagentroles'].on('debug::request',  debug);
  client['customagentroles'].on('debug::response', debug);

  exports['Organizations'] = require('./client/organizations')['Organizations'];
  client['organizations'] = new exports['Organizations'](options);
  client['organizations'].on('debug::request',  debug);
  client['organizations'].on('debug::response', debug);

  exports['Search'] = require('./client/search')['Search'];
  client['search'] = new exports['Search'](options);
  client['search'].on('debug::request',  debug);
  client['search'].on('debug::response', debug);

  exports['Tags'] = require('./client/tags')['Tags'];
  client['tags'] = new exports['Tags'](options);
  client['tags'].on('debug::request',  debug);
  client['tags'].on('debug::response', debug);

  exports['Forums'] = require('./client/forums')['Forums'];
  client['forums'] = new exports['Forums'](options);
  client['forums'].on('debug::request',  debug);
  client['forums'].on('debug::response', debug);

  exports['ForumSubscriptions'] = require('./client/forumsubscriptions')['ForumSubscriptions'];
  client['forumsubscriptions'] = new exports['ForumSubscriptions'](options);
  client['forumsubscriptions'].on('debug::request',  debug);
  client['forumsubscriptions'].on('debug::response', debug);

  exports['Categories'] = require('./client/categories')['Categories'];
  client['categories'] = new exports['Categories'](options);
  client['categories'].on('debug::request',  debug);
  client['categories'].on('debug::response', debug);

  exports['Topics'] = require('./client/topics')['Topics'];
  client['topics'] = new exports['Topics'](options);
  client['topics'].on('debug::request',  debug);
  client['topics'].on('debug::response', debug);

  exports['TopicComments'] = require('./client/topiccomments')['TopicComments'];
  client['topiccomments'] = new exports['TopicComments'](options);
  client['topiccomments'].on('debug::request',  debug);
  client['topiccomments'].on('debug::response', debug);

  exports['TopicSubscriptions'] = require('./client/topicsubscriptions')['TopicSubscriptions'];
  client['topicsubscriptions'] = new exports['TopicSubscriptions'](options);
  client['topicsubscriptions'].on('debug::request',  debug);
  client['topicsubscriptions'].on('debug::response', debug);

  exports['TopicVotes'] = require('./client/topicvotes')['TopicVotes'];
  client['topicvotes'] = new exports['TopicVotes'](options);
  client['topicvotes'].on('debug::request',  debug);
  client['topicvotes'].on('debug::response', debug);

  exports['AccountSettings'] = require('./client/accountsettings')['AccountSettings'];
  client['accountsettings'] = new exports['AccountSettings'](options);
  client['accountsettings'].on('debug::request',  debug);
  client['accountsettings'].on('debug::response', debug);

  exports['ActivityStream'] = require('./client/activitystream')['ActivityStream'];
  client['activitystream'] = new exports['ActivityStream'](options);
  client['activitystream'].on('debug::request',  debug);
  client['activitystream'].on('debug::response', debug);

  exports['Attachments'] = require('./client/attachments')['Attachments'];
  client['attachments'] = new exports['Attachments'](options);
  client['attachments'].on('debug::request',  debug);
  client['attachments'].on('debug::response', debug);

  exports['JobStatuses'] = require('./client/jobstatuses')['JobStatuses'];
  client['jobstatuses'] = new exports['JobStatuses'](options);
  client['jobstatuses'].on('debug::request',  debug);
  client['jobstatuses'].on('debug::response', debug);

  exports['Locales'] = require('./client/locales')['Locales'];
  client['locales'] = new exports['Locales'](options);
  client['locales'].on('debug::request',  debug);
  client['locales'].on('debug::response', debug);

  exports['Macros'] = require('./client/macros')['Macros'];
  client['macros'] = new exports['Macros'](options);
  client['macros'].on('debug::request',  debug);
  client['macros'].on('debug::response', debug);

  exports['SatisfactionRatings'] = require('./client/satisfactionratings')['SatisfactionRatings'];
  client['satisfactionratings'] = new exports['SatisfactionRatings'](options);
  client['satisfactionratings'].on('debug::request',  debug);
  client['satisfactionratings'].on('debug::response', debug);

  exports['SuspendedTickets'] = require('./client/suspendedtickets')['SuspendedTickets'];
  client['suspendedtickets'] = new exports['SuspendedTickets'](options);
  client['suspendedtickets'].on('debug::request',  debug);
  client['suspendedtickets'].on('debug::response', debug);

  exports['UserFields'] = require('./client/userfields')['UserFields'];
  client['userfields'] = new exports['UserFields'](options);
  client['userfields'].on('debug::request',  debug);
  client['userfields'].on('debug::response', debug);

  exports['OrganizationFields'] = require('./client/organizationfields')['OrganizationFields'];
  client['organizationfields'] = new exports['OrganizationFields'](options);
  client['organizationfields'].on('debug::request',  debug);
  client['organizationfields'].on('debug::response', debug);

  exports['OauthTokens'] = require('./client/oauthtokens')['OauthTokens'];
  client['oauthtokens'] = new exports['OauthTokens'](options);
  client['oauthtokens'].on('debug::request',  debug);
  client['oauthtokens'].on('debug::response', debug);

  exports['Triggers'] = require('./client/triggers')['Triggers'];
  client['triggers'] = new exports['Triggers'](options);
  client['triggers'].on('debug::request',  debug);
  client['triggers'].on('debug::response', debug);

  exports['SharingAgreement'] = require('./client/sharingagreement')['SharingAgreement'];
  client['sharingagreement'] = new exports['SharingAgreement'](options);
  client['sharingagreement'].on('debug::request',  debug);
  client['sharingagreement'].on('debug::response', debug);

  exports['Brand'] = require('./client/brand')['Brand'];
  client['brand'] = new exports['Brand'](options);
  client['brand'].on('debug::request',  debug);
  client['brand'].on('debug::response', debug);

  exports['OrganizationMemberships'] = require('./client/organizationmemberships')['OrganizationMemberships'];
  client['organizationmemberships'] = new exports['OrganizationMemberships'](options);
  client['organizationmemberships'].on('debug::request',  debug);
  client['organizationmemberships'].on('debug::response', debug);

  exports['DynamicContent'] = require('./client/dynamiccontent')['DynamicContent'];
  client['dynamiccontent'] = new exports['DynamicContent'](options);
  client['dynamiccontent'].on('debug::request',  debug);
  client['dynamiccontent'].on('debug::response', debug);

  exports['TicketEvents'] = require('./client/ticketevents')['TicketEvents'];
  client['ticketevents'] = new exports['TicketEvents'](options);
  client['ticketevents'].on('debug::request',  debug);
  client['ticketevents'].on('debug::response', debug);

  exports['Imports'] = require('./client/imports')['Imports'];
  client['imports'] = new exports['Imports'](options);
  client['imports'].on('debug::request',  debug);
  client['imports'].on('debug::response', debug);

  exports['Targets'] = require('./client/targets')['Targets'];
  client['targets'] = new exports['Targets'](options);
  client['targets'].on('debug::request',  debug);
  client['targets'].on('debug::response', debug);

  exports['Sessions'] = require('./client/sessions')['Sessions'];
  client['sessions'] = new exports['Sessions'](options);
  client['sessions'].on('debug::request',  debug);
  client['sessions'].on('debug::response', debug);

  exports['Installations'] = require('./client/installations')['Installations'];
  client['installations'] = new exports['Installations'](options);
  client['installations'].on('debug::request',  debug);
  client['installations'].on('debug::response', debug);

  function debug(args) {
    if (options.get('debug')) {
      console.log(args);
    }
  }

  return client;
};
