import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';
import { Input } from '../../components';

const MedRecordCreate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome do paciente é obrigatório !!'),
        specialist: Yup.string().required('O nome do especialista é obrigatório !!'),
        descripition: Yup.string().required('A descrição é obrigatória !!'),
      });
      await schema.validate(data, { abortEarly: false });

      console.log(data);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          if (typeof error.path === 'string') {
            Object.assign(validationErrors, { [error.path]: error.message });
          }
        });
        if (typeof formRef?.current?.setErrors === 'function') {
          formRef.current.setErrors(validationErrors);
        }
      }
    }
  }, []);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Input label="Nome do paciente:" name="name" />
      <Input label="Nome do especialista:" name="specialist" />
      <Scope path="description">
        <Input label="Descrição" name="description" />
      </Scope>
      <button type="submit">enviar</button>
    </Form>
  );
};

export { MedRecordCreate };
