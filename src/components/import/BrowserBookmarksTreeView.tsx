import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useEffectOnce } from 'react-use';
import browser from 'webextension-polyfill';
import { JSX, useState } from "react";
import { setBrowserBookmarks } from 'src/redux/slices/importSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { TreeViewSelectionPropagation } from '@mui/x-tree-view/models';
import { toggleNodeChecked } from 'src/redux/slices/importSlice';

const toTreeItem = (item) => {
  if (Array.isArray(item.children)) {
    return {
      id: item.id,
      label: item.title,
      children: item.children.map( itm => toTreeItem(itm) )
    }
  } else {
    return {
      id: item.id,
      label: item.title,
    }
  }
}

function BrowserBookmarksTreeView(): JSX.Element {
  const dispatch = useAppDispatch();
  const browserBookmarks = useAppSelector((s) => s.import.browserBookmarks);
  const [selectionPropagation] =
    useState<TreeViewSelectionPropagation>({
      parents: true,
      descendants: true,
    });

  useEffectOnce(() => {
    const getBookmarks = async () => {
      const bookmarks = await browser.bookmarks.getTree();

      dispatch(setBrowserBookmarks(bookmarks[0]));
    };
    if (browserBookmarks == null) {
      getBookmarks();
    }
  });


  if (browserBookmarks == null) {
    return <></>;
  }

  const items = [
    {
      id: browserBookmarks.id,
      label: 'Browser Bookmarks',
      children: browserBookmarks.children.map( itm => toTreeItem(itm)),
    }
  ]

  return (
    <RichTreeView
      checkboxSelection
      multiSelect
      sx={{
        flexGrow: 1,
        maxWidth: '100%',
        userSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      onItemSelectionToggle={ ( _event, itemId, _isSelected ) => dispatch(toggleNodeChecked(itemId)) }
      defaultExpandedItems={[browserBookmarks.id]}
      items={items}
      >
    </RichTreeView>
  );
}

export default BrowserBookmarksTreeView;
