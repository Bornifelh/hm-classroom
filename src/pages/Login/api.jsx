const logIn = async (login_eleve, pass_eleve) =>{
    try {
        const response = await axios.post('https://hmproges.online/backendhmclassroom/user_login_test.php', {
          login_eleve,
          pass_eleve,
        });
        return response.data;
    } catch(error){
      console.error('Echec du login');
      throw error;
    }
  };