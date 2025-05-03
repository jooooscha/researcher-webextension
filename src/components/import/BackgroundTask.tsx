// src/BackgroundTask.js
import { useEffect, useState } from 'react';
import browser from 'webextension-polyfill';
import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
  useUpdateBookmarkMutation,
} from 'src/redux/services/elasticsearch/api';
import { crawl } from 'src/libs/crawl';
import { prepareBookmark } from 'src/libs/utils';

const [esExistDoc, _setExistDoc] = useState<ElasticSearchDoc>(undefined);
import { INDEX_NAME } from 'src/constants';
import { ElasticSearchDoc } from 'src/types';


const BackgroundTask = () => {
  const [createBookmark, {}] = useCreateBookmarkMutation();
  const [updateBookmark, {}] = useUpdateBookmarkMutation();
    useDeleteBookmarkMutation();
  const [_isBookmarking, setIsBookmarking] = useState(false);

  const importBookmark = async (url: string) => {
    console.log("url:", url)

    // const [createBookmark, {}] = useCreateBookmarkMutation();
    try {
      setIsBookmarking(true)

      const htmlText = await crawl(url);

      const bookmark = prepareBookmark(url, htmlText);
      bookmark.stars = 5;
      bookmark.isReadLater = false;

      if (esExistDoc) {
        await updateBookmark({
          id: esExistDoc.id,
          index: esExistDoc.index,
          body: { doc: bookmark },
        });
        // await getElasticsearchDoc(targetUrl, 'update');
        //sendSearchResultShouldUpdate();
        console.log("Successful update")
      } else {
        await createBookmark({
          index: INDEX_NAME,
          body: bookmark,
          refresh: true, // ! must refresh
        });
        console.log("Successful create")
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(async () => {
      console.log('Running background task...');

      const bookmarks = await browser.bookmarks.getTree();

      try {
        const b: Object[] =
          bookmarks[0]?.children?.find(d => d.title == "Other Bookmarks")?.children?.find(d => d.title == "researcher");

        // console.log("bookmarks:", b.children)

        // dispatch(setBrowserBookmarks(b.children));
        importBookmark(b.children[0].url)
        console.log("dispatched: ", b.children[0])

      } catch (e) {
        console.log("Could not get bookmarks")
      }


    // }, 1000 * 60 * 60); // once per hour
    }, 1000 * 5); // once per hour

    return () => clearInterval(intervalId);
  }, []);

  return null; // No UI needed
};

export default BackgroundTask;

