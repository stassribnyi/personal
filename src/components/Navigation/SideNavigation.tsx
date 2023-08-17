import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  IconButton,
  Paper,
  Stack,
  Typography,
  IconButtonProps,
} from '@mui/material'

const SideNavigationContext = createContext<string>('')

export const SideNavigation = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    React.PropsWithRef<{
      value: string
    }>
  >
>(({ children, value }, ref) => {
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  return (
    <SideNavigationContext.Provider value={currentValue}>
      <Paper
        ref={ref}
        elevation={5}
        sx={{
          zIndex: 1,
          top: '25%',
          left: '3rem',
          position: 'fixed',
          padding: '0.5rem',
          borderRadius: '0.5rem',
          color: 'common.light',
          bgcolor: 'common.dark',
        }}
      >
        <Stack gap={3}>{children}</Stack>
      </Paper>
    </SideNavigationContext.Provider>
  )
})

export const SideNavigationAction: React.FC<
  Partial<{
    href: string
    icon: React.ReactNode
    label: string
    showLabel: boolean
    onClick: IconButtonProps['onClick']
  }>
> = ({ label, icon, showLabel = true, ...props }) => {
  const current = useContext(SideNavigationContext)
  const isLabelShown = showLabel && label
  const isSelected = props.href === current

  return (
    <IconButton
      title={label}
      sx={{ flexDirection: 'column' }}
      color={isSelected ? 'primary' : 'inherit'}
      {...props}
    >
      {icon}
      {isLabelShown ? <Typography variant="caption">{label}</Typography> : null}
    </IconButton>
  )
}
