import { forwardRef } from 'react';
import { JSX } from "react";

import { ChevronRight, ExpandMore } from '@mui/icons-material';
import type { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
// import { Typography } from '@mui/material';
// import clsx from 'clsx';

import FlexBox from 'src/components/atoms/FlexBox';
import TreeItemLabel from 'src/components/import/TreeItemLabel';
// import { toggleNodeChecked } from 'src/redux/slices/importSlice';
// import { useAppDispatch } from 'src/redux/store';
import type { BrowserBookmarksType } from 'src/types';

const CustomContent = forwardRef((props, ref) => {
  // const {
  //   classes,
  //   className,
  //   label,
  //   nodeId,
  //   icon: iconProp,
  //   expansionIcon,
  //   displayIcon,
  // } = props;

  // const {
  //     status: {
  //       disabled,
  //       expanded,
  //       selected,
  //       focused,
  //       handleExpansion,
  //       handleSelection,
  //       preventSelection,
  //     },
  // } = useTreeItem(nodeId);

  // const icon = iconProp || expansionIcon || displayIcon;

  // const dispatch = useAppDispatch();

  // const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   preventSelection(event);
  // };

  // const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   handleExpansion(event);
  // };

  // const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   handleSelection(event);
  //   dispatch(toggleNodeChecked(nodeId));
  // };
      // className={clsx(className, classes.root, {
      //   [classes.expanded]: expanded,
      //   [classes.selected]: selected,
      //   [classes.focused]: focused,
      //   [classes.disabled]: disabled,
      // })}
      // onMouseDown={handleMouseDown}
      // ref={ref as React.Ref<HTMLDivElement>}>
      // <div onClick={handleExpansionClick} className={classes.iconContainer}>
      //   {icon}
      // </div>
      // <Typography
      //   onClick={handleSelectionClick}
      //   component="div"
      //   className={classes.label}>
      //   {label}
      // </Typography>

  return (
    <div>
    {label}
    </div>
  );
});

const CustomTreeItem = (props: TreeItemProps) => (
  <TreeItem ContentComponent={CustomContent} {...props} />
);

type Props = {
  node: BrowserBookmarksType;
};

const MyTreeItem = ({ node }: Props): JSX.Element => {
  const { id, type } = node;

  if (id == null || type == null) {
    return <></>;
  }

  return (
    <CustomTreeItem
      key={id}
      nodeId={id}
      collapseIcon={
        <FlexBox alignItems="center">
          {type === 'folder' && <ExpandMore style={{ fontSize: 30 }} />}
        </FlexBox>
      }
      expandIcon={
        <FlexBox alignItems="center">
          {type === 'folder' && <ChevronRight style={{ fontSize: 30 }} />}
        </FlexBox>
      }
      label={<TreeItemLabel node={node} />}>
    </CustomTreeItem>
  );
};

export default MyTreeItem;
