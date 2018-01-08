// <%= resource_title %> Containers
import <%= resource_title %>List from '@/containers/<%= resource_name %>_list'
import <%= resource_title %>New from '@/containers/<%= resource_name %>_new'
import <%= resource_title %>Show from '@/containers/<%= resource_name %>_show'
import <%= resource_title %>Edit from '@/containers/<%= resource_name %>_edit'

export const <%= resource_title %>ListRoute = {
  path: '/<%= resource_route %>',
  component: <%= resource_title%>List
}

export const <%= resource_title %>NewRoute = {
  path: '/<%= resource_route %>/new',
  component: <%= resource_title%>New
}

export const <%= resource_title %>ShowRoute = {
  path: '/<%= resource_route %>/:id',
  component: <%= resource_title%>Show,
  props: true
}

export const <%= resource_title %>EditRoute = {
  path: '/<%= resource_route %>/:id/edit',
  component: <%= resource_title%>Edit,
  props: true
}
