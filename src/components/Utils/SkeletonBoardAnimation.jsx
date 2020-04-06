import React from 'react';
import { Skeleton } from '@material-ui/lab';
import '../../styles/Utils/SkeletonBoard.scss';

export const createAnimation = () => {
  let SkeletonArray = [];
  for (let i = 0; i <= 63; i++) {
    SkeletonArray.push(
      <Skeleton
        className={`skeleton ${deterimeColor(i)}`}
        variant='rect'
      />
    );
  }
  return <div className='skeleton-board-container'>{SkeletonArray}</div>;
};

const deterimeColor = i => {
    return parseInt(i / 8) % 2 ? (i % 2 ? 'white' : 'grey') : i % 2 ? 'grey' : 'white';
}
