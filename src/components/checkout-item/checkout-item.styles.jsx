import styled from 'styled-components';

export const StCheckoutItems = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`

export const StCheckoutImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
`
export const StCheckoutImage = styled.img`
  width: 100%;
  height: 100%;
`

export const StCheckoutText = styled.span`
  width: 23%;
`

export const StCheckoutQuantityContainer = styled.span`
  display: flex;
  width: 23%;
`

export const StCheckoutQuantityArrow = styled.div`
  cursor: pointer;
`

export const StCheckoutQuantityValue = styled.span`
  margin: 0 10px;
`

export const StCheckoutRemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`
