import React, { useEffect, useState } from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import api from '../../services/index';

interface IMedRecord {
  id: string;
  client: Record<string, string>;
  specialist: object;
  // eslint-disable-next-line camelcase
  create_at: Date;
  description: string;
}

const MedRecordHistory: React.FC = () => {
  const clientID = 'cd4a6977-8612-4250-97b2-2740bdf8b832';

  const [medRecords, setMedRecord] = useState<IMedRecord[]>([]);

  async function loadMedRecords() {
    const response = await api.get(`/medrecord/get/${clientID}`);
    console.log(response);
    setMedRecord(response.data);
  }

  useEffect(() => {
    loadMedRecords();
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Especialista</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>

          {
            medRecords.map((medRecord) => (
              <tr key={medRecord.id}>
                <td>
                  client
                </td>
                <td>
                  especilista
                </td>
                <td>
                  { medRecord.create_at }
                </td>
                <td>
                  { medRecord.create_at }
                </td>
                <td>
                  { medRecord.description }
                </td>
                <td>
                  <DefaultButton text="Editar" allowDisabledFocus />
                  <DefaultButton text="Excluir" allowDisabledFocus />
                </td>
              </tr>
            ))

          }

        </tbody>
      </table>
    </div>
  );
};

export { MedRecordHistory };
