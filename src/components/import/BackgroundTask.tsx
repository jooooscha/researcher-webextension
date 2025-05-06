import { useEffect } from 'react';
import browser from 'webextension-polyfill';
import {
  useCreateBookmarkMutation,
  useUpdateBookmarkMutation,
} from 'src/redux/services/elasticsearch/api';
import { crawl } from 'src/libs/crawl';
import { prepareBookmark } from 'src/libs/utils';

import { INDEX_NAME } from 'src/constants';
import { getDocByUrl } from 'src/redux/slices/esConfigSlice';
import { useAppDispatch } from 'src/redux/store';

const BackgroundTask = () => {
  const [createBookmark, {}] = useCreateBookmarkMutation();
  const [updateBookmark, {}] = useUpdateBookmarkMutation();
  const dispatch = useAppDispatch();
  type Bookmark = browser.Bookmarks.BookmarkTreeNode;

  const importBookmark = async (url: string) => {
    try {
      const htmlText = await crawl(url);

      const bookmark = prepareBookmark(url, htmlText);
      bookmark.stars = 5;
      bookmark.isReadLater = false;

      const esDoc = await dispatch(getDocByUrl({ url })).unwrap();
      if (esDoc) {
        /* await updateBookmark({
          id: esDoc.id,
          index: esDoc.index,
          body: { doc: bookmark },
        });
        console.log("Bookmark successfully updated")
        */
      } else {
        await createBookmark({
          index: INDEX_NAME,
          body: bookmark,
          refresh: true, // ! must refresh
        });
        console.log("Bookmark successfully created")
      }
    } catch (e) {
      console.log("Could not update bookmark: ", e);
    }
  }

  const backgroundTask = async () => {
      console.log('Running background task...');

      const bookmarks = await browser.bookmarks.getTree();
      const otherBookmarks = bookmarks[0]?.children?.find(
        (d): d is Bookmark => d.title === "Other Bookmarks" && Array.isArray(d.children)
      );


      const researcher = otherBookmarks?.children?.find(
        (d): d is Bookmark => d.title === "researcher" && Array.isArray(d.children)
      );

      if (researcher && researcher.children && researcher.children[0]?.url) {
        for (let bookmark of researcher.children) {
          if (bookmark.url) {
            importBookmark(bookmark.url);
          }
        }
      } else {
        console.warn("Could not find valid researcher bookmark or URL.");
      }
  }
  useEffect(() => {
    const timer = 5 * 60 * 1000;

    backgroundTask()

    console.log('Starting background timer. Running in', timer/1000, "s");

    const intervalId = setInterval(async () => {
      await backgroundTask()
    }, 5 * 60 * 1000); // once per hour


    return () => clearInterval(intervalId);
  }, []);

  return null; // No UI needed
};

export default BackgroundTask;
