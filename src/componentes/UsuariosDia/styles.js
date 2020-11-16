import styled from 'styled-components';

export const IndicadorUsrDia = styled.fieldset`
    display: flex;
    flex-direction: row;
    padding: 20px 20px;
    width: 400px;
    margin-top: 50px;

    label {
        margin: 5px 5px;
    }

    input {
        max-width: 150px;
        padding: 5px;
    }

    input[type="button"] {
        max-width: 100%;
        margin-left: 30px;
    }
`;