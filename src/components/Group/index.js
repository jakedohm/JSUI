import React, { Component } from 'react';

//mobx
import { observer, inject } from 'mobx-react';
import Boolean from 'models/Boolean';

import { faEdit, faTrash, faMinusSquare, faPlusSquare, faPlus } from '@fortawesome/fontawesome-free-solid';

//styles
import * as S from './styles';
import * as A from 'styles/shared-components';

//components
import ProjectCard from 'components/ProjectCard';

@inject('store')
@observer
class Group extends Component {
  collapsed = Boolean.create();

  render() {
    const { group, collapsed, onClick, store } = this.props;
    const hasProjects = group.projects.length > 0;
    const showProjects = hasProjects && collapsed === false && this.collapsed.value === false;

    return (
      <S.Group spaceAll={10} collapsed={collapsed} onClick={onClick}>

        <A.Horizontal centerV spaceBetween>
          <A.Horizontal spaceAll={10}>
            {hasProjects && (
              <A.ActionIcon
                delay={700}
                onClick={this.collapsed.toggle}
                icon={this.collapsed.value ? faPlusSquare : faMinusSquare}
                tip="Collapse group"
              />
            )}
            <S.Name>{group.name}</S.Name>
          </A.Horizontal>

          {!collapsed && (
            <A.Horizontal spaceAll={15}>
              <A.ActionIcon
                onClick={() => store.openFolder(group.id)}
                icon={faPlus}
                tip="Import project here"
              />
              <A.ActionIcon
                onClick={() => store.renameGroup(group.name, group.id)}
                icon={faEdit}
                tip="Rename"
              />
              <A.ActionIcon icon={faTrash} onClick={() => store.deleteGroup(group.id)} tip="Delete group" />
            </A.Horizontal>
          )}
        </A.Horizontal>

        {showProjects && (
          <S.ProjectList>
            {group.projects.map(project => (
              <ProjectCard showMove={store.canMoveProject} project={project} key={project.name} />
            ))}
          </S.ProjectList>
        )}
      </S.Group>
    );
  }
}

export default Group;
