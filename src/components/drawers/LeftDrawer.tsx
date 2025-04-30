import { useState, JSX } from 'react';

import {
  ExpandLess,
  ExpandMore,
  Home,
  ImportExport,
  PushPin,
  Settings,
  StarBorder,
  VideoLibrary,
} from '@mui/icons-material';
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Rating,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import BrandMenuLogo from 'src/components/drawers/BrandMenuLogo';
import IconList from 'src/components/drawers/list_group/IconList';
import {
  LEFT_DRAWER_ICON_WIDTH,
  LEFT_DRAWER_WIDTH,
  NAVBAR_HEIGHT,
  ROUTE_HOME,
  ROUTE_IMPORT,
  ROUTE_SEARCH,
  ROUTE_SETTINGS,
  VIDEO_SITES,
} from 'src/constants';
import type { SearchMode } from 'src/types';

type Props = {
  open: boolean;
  variant: 'persistent' | 'permanent' | 'temporary';
  onMenuIconClick: () => void;
  displayBrandHead: boolean;
  onClose: () => void;
};

function LeftDrawer({
  open,
  displayBrandHead,
  variant,
  onMenuIconClick,
  onClose,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openStars, setOpenStars] = useState(true);

  const handleToggleStarMenu = () => {
    setOpenStars(!openStars);
  };

  const goToSearchByStars = (value: number) => {
    navigate(ROUTE_SEARCH, { state: { stars: value } });
  };

  return (
    <>
      <Drawer
        open={open}
        variant={variant}
        transitionDuration={0}
        elevation={0}
        onClose={() => onClose()}>
        {displayBrandHead && (
          <Box
            sx={{
              paddingTop: '2px',
              paddingLeft: '14px',
            }}>
            <BrandMenuLogo onMenuIconClick={onMenuIconClick} />
          </Box>
        )}
        <Box
          sx={{
            width: LEFT_DRAWER_WIDTH,
            padding: 1,
          }}>
          {!displayBrandHead && <Box height={NAVBAR_HEIGHT} />}

          <List sx={{ paddingTop: 0 }}>
            <IconList
              headerText={t('Home')}
              icon={<Home />}
              onClick={() => navigate(ROUTE_HOME)}
            />

            <IconList
              headerText={t('Read Later')}
              icon={<PushPin />}
              onClick={() => navigate(ROUTE_SEARCH, { state: { isReadLater: true } })}
            />

            <ListItemButton onClick={handleToggleStarMenu}>
              <ListItemIcon sx={{ minWidth: LEFT_DRAWER_ICON_WIDTH }}>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={t('Stars')} />
              {openStars ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openStars} timeout="auto" unmountOnExit>
              <List component="div">
                {[5, 4, 3, 2, 1, 0].map((v, i) => {
                  return (
                    <ListItemButton
                      key={i}
                      sx={{ pl: 4 }}
                      onClick={() => goToSearchByStars(v)}>
                      <Rating value={v} readOnly />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>

            <IconList
              headerText={t('Videos')}
              icon={<VideoLibrary />}
              onClick={() => navigate(ROUTE_SEARCH, { state: { sites: VIDEO_SITES } })}
            />

            <IconList
              headerText={t('Import')}
              icon={<ImportExport />}
              onClick={() => navigate(ROUTE_IMPORT)}
            />

            <IconList
              headerText={t('Settings')}
              icon={<Settings />}
              onClick={() => navigate(ROUTE_SETTINGS)}
            />
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default LeftDrawer;
