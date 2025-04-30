import { Menu } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import LogoSmall from './LogoSmall';

import { ROUTE_HOME } from 'src/constants';

type Props = {
  onMenuIconClick: () => void;
};

function BrandMenuLogo({ onMenuIconClick }: Props): JSX.Element {
  const history = useNavigate();

  return (
    <Box alignItems="center" display="flex">
      <IconButton onClick={() => onMenuIconClick()} size="large">
        <Menu />
      </IconButton>
      <Box>
        <LogoSmall onClick={() => history.push(ROUTE_HOME)} />
      </Box>
    </Box>
  );
}

export default BrandMenuLogo;
