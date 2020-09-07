import { rolesTypes } from 'consts';

export const apiUrls = {
  AUTH: {
    SIGN_UP: '/auth/sign-up/:token',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PASSWORD_RESET_REQUEST: '/auth/reset-password-request',
    PASSWORD_RESET: '/auth/reset-password/:id/:token'
  },
  USER: {
    DETAILS: '/users/current-user',
    CHANGE_PASSWORD: '/auth/internal-reset-password',
    EMAIL_SUBSCRIPTION: '/users/allow-subscriptions'
  },
  ADMIN: {
    USERS: {
      ADD: '/auth/send-invite',
      UPDATE: '/users/:id',
      CHECKERS: '/users/fact-checkers',
      SPECIALISTS: '/users/specialists',
      EXPERTS: '/users/experts',
      MODERATORS: '/users/moderators'
    },
    INVITATIONS: '/users/invitations',
    EDIT: {
      NEWS: '/news/management/news/:id',
      IMAGE: '/news/management/news-image/:id',
      EXPERT_OPINION: '/news/management/expert-opinion/:opinionId',
      CHECKER_OPINION: '/news/management/fact-checker-opinion/:opinionId'
    },
    SENSITIVE: {
      LIST: '/news/keywords/sensitive',
      DETAILS: '/news/keywords/sensitive/:id'
    },
    DOMAINS: {
      LIST: '/news/keywords/domains',
      DETAILS: '/news/keywords/domains/:id'
    },
    HASHTAGS: {
      LIST: '/news/keywords/tags',
      DETAILS: '/news/keywords/tags/:id'
    },
    ASSIGNMENT: {
      ASSIGN: '/news/management/news/:id/assign',
      DISMISS: '/news/management/news/:id/dismiss-assignment'
    }
  },
  SUBMISSIONS: {
    ASSIGNMENT: {
      DISMISS: '/news/crew/expert/news/:id/dismiss-assignment'
    },
    HASHTAGS: {
      LIST: '/news/keywords/tags'
    },
    HISTORY: {
      LIST: '/news/verified/news',
      DETAILS: '/news/verified/news/:id'
    },
    [rolesTypes.CHECKER]: {
      LIST: '/news/crew/fact-checker/news',
      DETAILS: '/news/crew/fact-checker/news/:id',
      VERIFY: '/news/crew/fact-checker/news/:id/create-opinion'
    },
    [rolesTypes.EXPERT]: {
      LIST: '/news/crew/expert/news',
      DETAILS: '/news/crew/expert/news/:id',
      VERIFY: '/news/crew/expert/news/:id/create-opinion',
      TAGS: '/news/crew/expert/news/:id/assign-tags'
    },
    [rolesTypes.SPECIALIST]: {
      LIST: '/news/crew/expert/news',
      DETAILS: '/news/crew/expert/news/:id',
      VERIFY: '/news/crew/expert/news/:id/create-opinion',
      TAGS: '/news/crew/expert/news/:id/assign-tags'
    },
    [rolesTypes.MODERATOR]: {
      LIST: '/news/management/news',
      DETAILS: '/news/management/news/:id',
      VERIFY: '/news/crew/expert/news/:id/create-opinion'
    },
    [rolesTypes.ADMIN]: {
      LIST: '/news/management/news',
      DETAILS: '/news/management/news/:id'
    }
  }
};

export const appUrls = {
  DASHBOARD: '/',
  GUIDE: '/guide',
  REGISTER: '/register/:token',
  LOGIN: '/login',
  PASSWORD_RESET_REQUEST: '/reset-password',
  PASSWORD_RESET: '/reset-password/:id/:token',
  ADMIN: {
    CHECKERS: '/community',
    SPECIALISTS: '/specialists',
    EXPERTS: '/experts',
    MODERATORS: '/moderators',
    INVITATIONS: '/invitations'
  },
  SUBMISSIONS: {
    DETAILS: '/submissions/:id',
    LIST: '/submissions'
  },
  HISTORY: {
    LIST: '/history',
    DETAILS: '/history/:id'
  },
  SETTINGS: '/settings',
  NOT_FOUND: '/404/',
  NOT_READY: '/#'
};

export const outerUrls = {
  CHECKER_FORM:
    'https://zgloszenia.govtech.gov.pl/ankieta/512297/dolacz-do-korpusu-ludzi-walczacych-z-dezinformacja-towarzyszaca-epidemii-koronawirusa.html?fbclid=IwAR00LUCwzbZ4szwf2YO7cvg74BA1KswfdtPIPs1_m4RayGlJjs43J4Q-5co'
};
