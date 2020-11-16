import styled from 'styled-components';

export const IndicadorCsmMes = styled.fieldset`
    display: flex;
    flex-direction: row;
    padding: 20px 20px;
    width: 430px;

    label {
        margin: 5px 5px;
    }

    input {
        max-width: 200px;
        padding: 5px;
    }

    input[type="number"] {
        font-size: 17px;
        padding-left: 20px;
        max-width: 40px;
    }

    label[for="qtd"] {
        margin-left: 20px;
    }
`;