/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import NotificationService from "../../../services/notification.service";
import PortalConfigService from "../../../services/portalConfig.service";
import { StateService } from '@uirouter/core';
import _ = require('lodash');

const PortalSettingsComponent: ng.IComponentOptions = {
  bindings: {
  },
  template: require('./portal.html'),
  controller: function(
    NotificationService: NotificationService,
    PortalConfigService: PortalConfigService,
    $state: StateService,
    Constants: any
  ) {
    'ngInject';
    this.ConstantsCopy = _.cloneDeep(Constants);

    this.$onInit = () => {
      this.ConstantsCopy.authentication.localLogin.enabled = (this.ConstantsCopy.authentication.localLogin.enabled || !this.hasIdpDefined());
    };

    this.widgets = [
      {'id': 'geo_country', 'label': 'Hits by country'},
      {'id': 'geo_city', 'label': 'Hits by city'},
      {'id': 'host', 'label': 'Hits by HTTP Host header'}];

    this.save = () => {
      PortalConfigService.save(this.ConstantsCopy).then( (response) => {
        _.merge(Constants, response.data);
        NotificationService.show("Configuration saved !");
      });
    };

    this.reset = () => {
      this.ConstantsCopy = _.cloneDeep(Constants);
    };

    this.hasIdpDefined = () => {
      return this.ConstantsCopy.authentication.google.clientId ||
       this.ConstantsCopy.authentication.github.clientId ||
       this.ConstantsCopy.authentication.oauth2.clientId;
    }
  }
};

export default PortalSettingsComponent;
