import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    
    
     ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 2.4rem;
      font-weight: 600;
      text-align: center;
      @media screen and (min-width: 650px) {
        font-size: 3rem;
      }
    `}
    
  line-height: 1.4;
`;

// const Heading = styled.h1`
//   ${(props) =>
//     props.as === "h1" &&
//     css`
//       ${tw`text-[3rem] font-semibold`}
//     `}

//   ${(props) =>
//     props.as === "h2" &&
//     css`
//       ${tw`font-semibold text-[2rem]`}
//     `}

//     ${(props) =>
//     props.as === "h3" &&
//     css`
//       ${tw`font-semibold text-[2rem]`}
//     `}

//     ${(props) =>
//     props.as === "h4" &&
//     css`
//       text-align: center;
//       font-size: 2.4rem;
//       font-weight: 600;

//       @media screen and (min-width: 650px) {
//         font-size: 3rem;
//       }
//     `}
// `;

export default Heading;
