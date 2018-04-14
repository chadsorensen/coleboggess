export default {
  APPEND_PROJECT: (state, project) => {
    state.projects.push(project);
  },
  ACTIVE_PROJECT: (state, slug) => {
    var projects = state.projects
    console.log("slug", slug);
    var interval = setInterval(function(){
      if(projects.length > 0) {
        clearInterval(interval);
        for (var i = 0, len = projects.length; i < len; i++) {
          if(projects[i].fields.slug === slug) {
            console.log("slug", slug)
            console.log("pre slice state.project", state.activeProject.length)
            state.activeProject.splice(0, 1, projects[i])
            console.log("post slice state.project", state.activeProject.length)
          };
        }
      }
    }, 200);
  },
};
