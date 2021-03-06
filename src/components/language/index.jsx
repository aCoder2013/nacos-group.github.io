import React from 'react';
import { autobind } from 'core-decorators';
import cookie from 'js-cookie';
import qs from 'querystring';
import ReactGA from 'react-ga';

export default class Language extends React.Component {
  constructor() {
    super();
      ReactGA.initialize('UA-121449408-1');
      // ReactGA.initialize('UA-121449408-1', { debug: true });
  }

  componentWillReceiveProps() {
    const path = window.location.pathname + window.location.hash;
    if (path.includes('/#/docs/')) {
      if (path.includes('?lang=')) {
        ReactGA.pageview(path);
      }
    } else {
      ReactGA.pageview(path);
    }
  }

  @autobind
  onLanguageChange(language) {
    const { location } = this.props;
    cookie.set('docsite_language', language, { expires: 365, path: '' });
    // 语言版本在hash上也存一份，方便分享链接时能够获取语言版本，不放在window.location的search上是因为会导致页面刷新
    const hashSearch = window.location.hash.split('?');
    if (hashSearch && hashSearch.length) {
      const search = qs.parse(hashSearch[1] || '');
      search.lang = language;
      window.location.hash = `${hashSearch[0] || ''}?${qs.stringify(search)}`;
    }
    this.forceUpdate();
  }
}
