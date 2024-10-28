import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { FetchResources } from '../FetchResources';

export const PulumiResources = () => {
  return (
    <Page themeId="tool">
      <Header
        title="Welcome to pulumi-resources!"
        subtitle="A custom plugin made for Iteration 1"
      >
        <HeaderLabel label="Owner" value="KazikKluz" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="Custom Pulumi Resource Plugin">
          <SupportButton>
            It shows all resources on AWS that were deployed with Pulumi
          </SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard title="Information card">
              <Typography variant="body1">
                It uses AWS SDK and ResourceGroupsTaggingAPIClient in
                particular. In order to resources to be tracked by this plugin
                all resources are required to have a tag:Provisioner=Pulumi
              </Typography>
            </InfoCard>
          </Grid>
          <Grid item>
            <FetchResources />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
