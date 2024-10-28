import React from 'react';
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';

import useAsync from 'react-use/lib/useAsync';

import { useApi, identityApiRef } from '@backstage/core-plugin-api';

type Resource = {
  ResourceARN: string;
  Tags: [{}];
};

type DenseTableProps = {
  resources: Resource[];
};

export const DenseTable = ({ resources }: DenseTableProps) => {
  const columns: TableColumn[] = [
    { title: 'No.', field: 'number' },
    { title: 'Resource Type', field: 'type' },
    { title: 'ARN', field: 'arn' },
  ];

  const data = resources.map((resource, idx) => {
    return {
      number: `${idx + 1}`,
      type: `${resource.ResourceARN.split(':')[2].toUpperCase()}`,
      arn: `${resource.ResourceARN}`,
    };
  });

  return (
    <Table
      title="List of provisioned resources"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const FetchResources = () => {
  const identityApi = useApi(identityApiRef);

  const fetchData = async () => {
    const credentials = await identityApi.getCredentials();
    const response = await fetch(
      `http://localhost/api/backend-pulumi-resources/findResources`,
      {
        method: 'GET',
        headers: {
          ...(credentials && { Authorization: `Bearer ${credentials.token}` }),
        },
      },
    );
    return response.json();
  };

  const { value, loading, error } = useAsync(fetchData);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <DenseTable resources={value.ResourceTagMappingList || []} />;
};
