import {
  Home,
  ImportExport,
  PushPin,
  Settings,
  StarBorder,
  VideoLibrary,
} from '@mui/icons-material';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import SmallSidebarItem from './SmallSidebarItem';

import {
  LEFT_DRAWER_SECONDARY_WIDTH,
  ROUTE_HOME,
  ROUTE_IMPORT,
  ROUTE_SEARCH,
  ROUTE_SETTINGS,
  VIDEO_SITES,
} from 'src/constants';
import type { SearchMode } from 'src/types';

type Props = {
  open: boolean;
};

function SmallSidebar({ open }: Props): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (open) {
    return (
      <Container
        sx={{
          position: 'fixed',
          left: '0px',
          backgroundColor: 'background.paper',
          width: LEFT_DRAWER_SECONDARY_WIDTH,
          height: '100vh',
        }}
        disableGutters>
        <SmallSidebarItem
          icon={<Home />}
          text={t('Home')}
          onClick={() => navigate(ROUTE_HOME)}
        />
        <SmallSidebarItem
          icon={<PushPin />}
          text={t('Read Later')}
          onClick={() => navigate(ROUTE_SEARCH, { state: { isReadLater: true } })}
        />
        <SmallSidebarItem
          icon={<StarBorder />}
          text={t('Stars')}
          onClick={() => navigate(ROUTE_SEARCH, { state: { stars: 5 } })}
        />
        <SmallSidebarItem
          icon={<VideoLibrary />}
          text={t('Videos')}
          onClick={() => navigate(ROUTE_SEARCH, { state: { sites: VIDEO_SITES } })}
        />
        <SmallSidebarItem
          icon={<ImportExport />}
          text={t('Import')}
          onClick={() => navigate(ROUTE_IMPORT)}
        />
        <SmallSidebarItem
          icon={<Settings />}
          text={t('Settings')}
          onClick={() => navigate(ROUTE_SETTINGS)}
        />
      </Container>
    );
  }

  return <span />;
}

export default SmallSidebar;
