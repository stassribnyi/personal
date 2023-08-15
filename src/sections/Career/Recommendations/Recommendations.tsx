import React, { useState } from 'react'

import {
  Avatar,
  Card,
  CardContent,
  Link,
  Pagination,
  Typography,
} from '@mui/material'

import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

import { RECOMMENDATIONS } from './Recommendation.data'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

export const Recommendations: React.FC = () => {
  const [slideIdx, setSlideIdx] = useState(0)

  return (
    <>
      <AutoPlaySwipeableViews
        animateHeight
        enableMouseEvents
        interval={5000}
        index={slideIdx}
        onChangeIndex={(index) => setSlideIdx(index)}
        style={{ width: '100%', padding: '0 150px' }}
      >
        {RECOMMENDATIONS.map((recommendation, idx) => (
          <Card
            key={idx}
            component="blockquote"
            sx={{
              maxWidth: 800,
              minHeight: 560,
              margin: '-1rem auto',
              boxShadow: '2px 2px 2px 0px rgba(var(--dark, 51, 51, 51), 0.2)',
              backgroundColor: 'rgb(50, 89, 99)',
              color: '#cecece',
              padding: '2rem',
              userSelect: 'none',
            }}
          >
            <CardContent>
              <Typography
                component="cite"
                gutterBottom
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src={recommendation.photoUrl}
                  alt={recommendation.displayName}
                  sx={{
                    width: 106,
                    height: 106,
                    border: '4px solid white',
                    marginBottom: '2rem',
                  }}
                />
                <Link
                  sx={{
                    fontStyle: 'normal',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  variant="h5"
                  href={recommendation.profileUrl}
                >
                  {recommendation.displayName}
                </Link>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  {recommendation.position}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'normal' }}>
                  {recommendation.relation}
                </Typography>
              </Typography>
              <Typography
                component="p"
                gutterBottom
                sx={{ textIndent: '2rem' }}
              >
                {recommendation.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </AutoPlaySwipeableViews>

      <Pagination
        page={slideIdx + 1}
        count={RECOMMENDATIONS.length}
        size="small"
        color="primary"
        onChange={(_, pageNumber) => setSlideIdx(pageNumber - 1)}
      />
    </>
  )
}
