import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

if(!(globalThis as any).__TIMEAGO__INITIALIZED__){
  TimeAgo.addDefaultLocale(en);
  (globalThis as any).__TIMEAGO__INITIALIZED__ = true;
}

export const timeAgo = new TimeAgo("en-US")
