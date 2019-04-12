import React from 'react';
import Card from '@material-ui/core/Card';
import ReactCardFlip from 'react-card-flip';
import o from '../../images/o.png';
import x from '../../images/x.png';
import { theme } from '../../styles/theme/theme';

const TTCCard = ({ card, value, handleCardClick }) => {
  return (
    <ReactCardFlip
      isFlipped={card.isFlipped}
      flipDirection='horizontal'
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.secondary.main
      }}
    >
      <Card
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.secondary.main
        }}
        className='Card'
        key='front'
        onClick={() => handleCardClick(value)}
      />
      <Card
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.secondary.main
        }}
        className='Card'
        key='back'
      >
        {card.mark === 'x' && (
          <img
            style={{
              width: '60%',
              height: '60%',
              marginLeft: '20%',
              marginTop: '15%'
            }}
            src={x}
            alt='x'
          />
        )}
        {card.mark === 'o' && (
          <img
            style={{
              width: '60%',
              height: '60%',
              marginLeft: '20%',
              marginTop: '15%'
            }}
            src={o}
            alt='o'
          />
        )}
      </Card>
    </ReactCardFlip>
  );
};

export default TTCCard;
