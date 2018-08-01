export default {
  APPEND_PROJECT: (state, project) => {
    state.projects.push(project);
  },
  ADD_REEL: (state, project) => {
    state.reel = project;
  },
  ACTIVE_PROJECT: (state, slug) => {
    let projects = state.projects
    let interval = setInterval(function(){
      if(projects.length > 0) {
        clearInterval(interval);
        for (let i = 0, len = projects.length; i < len; i++) {
          if(projects[i].fields.slug === slug) {
            state.activeProject.splice(0, 1, projects[i]);
          };
        }
      }
    }, 200);
  },
  ADD_ABOUT: (state, page) => {
    state.about.push(page);
  },
  ADD_CONTACT: (state, page) => {
    state.contact.push(page);
  },
};
