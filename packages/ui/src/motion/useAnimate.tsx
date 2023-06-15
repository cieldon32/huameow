import styled from 'styled-components';

export function useAnimate(children: any, css: any) {
  const Com = styled(children)`${css}`;
  return <Com />
}
