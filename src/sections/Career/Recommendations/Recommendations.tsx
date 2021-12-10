import React from 'react';

import { Carousel, Image } from '../../../components';
import { RECOMMENDATIONS } from './Recommendation.data';

export const Recommendations: React.FC = () => (
  <Carousel>
    {RECOMMENDATIONS.map((recommendation, idx) => (
      <blockquote key={idx} className='career__recommendation'>
        {recommendation.description}
        <cite>
          <a
            className='recommendation__details'
            href={recommendation.profileUrl}
          >
            <Image
              variant='rounded'
              src={recommendation.photoUrl}
              alt={recommendation.displayName}
            />
            <div className='recommendation__author-info'>
              <h4>{recommendation.displayName}</h4>
              <p>{recommendation.position}</p>
              <p>{recommendation.relation}</p>
            </div>
          </a>
        </cite>
      </blockquote>
    ))}
  </Carousel>
);
