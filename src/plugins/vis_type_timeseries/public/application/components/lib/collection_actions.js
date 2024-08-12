/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { v4 as uuidv4 } from 'uuid';

const newFn = () => ({ id: uuidv4() });

export function handleChange(props, doc) {
  const { model, name } = props;
  const collection = model[name] || [];
  const part = {};
  part[name] = collection.map((row) => {
    if (row.id === doc.id) return doc;
    return row;
  });
  props.onChange?.({ ...model, ...part });
}

export function handleDelete(props, doc) {
  const { model, name } = props;
  const collection = model[name] || [];
  const part = {};
  part[name] = collection.filter((row) => row.id !== doc.id);
  props.onChange?.({ ...model, ...part });
}

export function handleAdd(props, fn = newFn) {
  const { model, name } = props;
  const collection = model[name] || [];
  const part = {};
  part[name] = collection.concat([fn()]);
  props.onChange?.({ ...model, ...part });
}

export const collectionActions = { handleAdd, handleDelete, handleChange };
