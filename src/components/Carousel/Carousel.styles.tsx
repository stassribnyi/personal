import styled  from 'styled-components';

const List = styled.ul`
  position: relative;
  width: 100%;
  list-style: none;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  touch-action: pan-Y;
  overflow: hidden;
  padding: 0;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
  will-change: transform;
`;

const Item = styled.li`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  white-space: normal;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
    cursor: grab;

  & * {
    box-sizing: inherit;
  }
`;

const Track = styled.div`
    overflow: hidden;
`;

export const Styled = {
    Container,
    Item,
    List,
    Track
}
