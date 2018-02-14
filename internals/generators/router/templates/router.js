// <%= schema.label %> Containers
import <%= schema.label %>List from '@/containers/<%= schema.identifier %>_list'
import <%= schema.label %>New from '@/containers/<%= schema.identifier %>_new'
import <%= schema.label %>Show from '@/containers/<%= schema.identifier %>_show'
import <%= schema.label %>Edit from '@/containers/<%= schema.identifier %>_edit'

export const <%= schema.label %>ListRoute = {
  path: '/<%= schema.identifier_plural %>',
  component: <%= schema.label %>List
}

export const <%= schema.label %>NewRoute = {
  path: '/<%= schema.identifier_plural %>/new',
  component: <%= schema.label %>New
}

export const <%= schema.label %>ShowRoute = {
  path: '/<%= schema.identifier_plural %>/:id',
  component: <%= schema.label %>Show,
  props: true
}

export const <%= schema.label %>EditRoute = {
  path: '/<%= schema.identifier_plural %>/:id/edit',
  component: <%= schema.label %>Edit,
  props: true
}
