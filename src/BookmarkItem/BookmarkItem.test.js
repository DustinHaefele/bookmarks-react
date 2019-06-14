import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkItem from './BookmarkItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BookmarkItem title='thdenu' url='tnhueisntaho' rating={5}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
