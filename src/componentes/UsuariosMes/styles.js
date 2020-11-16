import styled from 'styled-components';

export const IndicadorUsrMes = styled.fieldset`
    display: flex;
    flex-direction: row;
    padding: 20px 20px;
    width: 400px;

    label {
        margin: 5px 5px;
    }

    input {
        max-width: 200px;
        padding: 5px;
    }

    input[type="button"] {
        max-width: 100%;
        margin-left: 30px;
    }
`;