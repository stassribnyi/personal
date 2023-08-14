import React, { useState } from 'react';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

import { Link, Pagination, Stack, styled } from '@mui/material';

import { RECOMMENDATIONS } from './Recommendation.data';
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  // MobileStepper,
} from '@mui/material';

const MobileStepper = ({ activeStep, steps, onStepClick }) => (
  <StepsContainer>
    {Array.from(Array(steps).keys()).map((step) => (
      <Step
        key={step}
        onClick={() => onStepClick(step)}
        active={activeStep === step}
      />
    ))}
  </StepsContainer>
);

// export default MobileStepper;

const StepsContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: 'transparent',
  justifyContent: 'center',
  marginTop: theme.spacing(3),
  flexDirection: 'row',
  gap: theme.spacing(0.5),
  padding: theme.spacing(1),
}));

const Step = styled('button')(({ theme, active }) => ({
  height: '8px',
  width: '8px',
  borderRadius: '50%',
  backgroundColor: active
    ? theme.palette.primary.main
    : theme.palette.grey[400],
  cursor: 'pointer',
}));

export const Recommendations: React.FC = () => {
  const [slideIdx, setSlideIdx] = useState(0);

  const handleNext = () => {
    setSlideIdx((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setSlideIdx((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <AutoPlaySwipeableViews
        animateHeight
        enableMouseEvents
        interval={5000}
        index={slideIdx}
        onChangeIndex={(index) => setSlideIdx(index)}
        style={{ width: '100%' }}
      >
        {RECOMMENDATIONS.map((recommendation, idx) => (
          <Card
            key={idx}
            component='blockquote'
            sx={{
              maxWidth: 800,
              minHeight: 560,
              margin: '-1rem auto',
              boxShadow: '2px 2px 2px 0px rgba(var(--dark, 51, 51, 51), 0.2)',
              // borderRadius: "40px",
              backgroundColor: 'rgb(50, 89, 99)',
              color: '#cecece',
              padding: '2rem',
            }}
          >
            <CardContent>
              <Typography
                component='cite'
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
                  variant='h5'
                  href={recommendation.profileUrl}
                >
                  {recommendation.displayName}
                </Link>
                <Typography variant='body2' sx={{ fontStyle: 'italic' }}>
                  {recommendation.position}
                </Typography>
                <Typography variant='body2' sx={{ fontStyle: 'normal' }}>
                  {recommendation.relation}
                </Typography>
              </Typography>
              <Typography
                component='p'
                gutterBottom
                sx={{ textIndent: '2rem' }}
              >
                {recommendation.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </AutoPlaySwipeableViews>
      {/* <MobileStepper
        variant='dots'
        steps={RECOMMENDATIONS.length}
        position='static'
        activeStep={slideIdx}
        onStepClick={setSlideIdx}
        nextButton={null}
        backButton={null}
        sx={{ maxWidth: 400, flexGrow: 1 }}
      /> */}

      <Pagination
        page={slideIdx + 1}
        count={RECOMMENDATIONS.length}
        size='small'
        color='primary'
        onChange={(_, pageNumber) => setSlideIdx(pageNumber - 1)}
      />
    </>
  );
};
