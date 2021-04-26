import styled from "styled-components";

export const Container = styled.header`
    background: var(--blue);
`;

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;

    padding: 2rem 1rem 12em;   //Cada rem equivale ao font-size do root do nosso estilo (global.ts)
                                //ou seja,2 rem = 32px 1 rem = 16px e 12 rem = 192px (para desktop)
                                //Assim vamos ter 32px em cima 16px de pedding nas laterias 
                                //e 160px no pedding em baixo
    display: flex;
    align-items: center;
    justify-content: space-between;

    button{
        font-size: 1rem;
        color: #FFF;
        background: var(--blue-light);
        border: 0;
        padding: 0 2rem;
        border-radius: 0.25rem;
        height: 3rem; 

        transition: filter 0.2s;

        &:hover{
            filter:brightness(0.4)
        }
    }
`