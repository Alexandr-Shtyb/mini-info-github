const GitHubServices = () => {
  const getAllCards = async (subject) => {
    const res = await fetch(`https://api.github.com/search/repositories?q=${subject}`);
    const resp = await res.json();
    return resp.items.map(_transformCards);
  }

  const _transformCards = (cards) => {
    console.log('cardsss', typeof cards);
    return {
      id: cards.id,
      nameProject: cards.full_name,
      author: cards.owner.login,
      avatar: cards.owner.avatar_url,
      stargazers: cards.stargazers_count,
      watchers: cards.watchers_count,
      repo: cards.html_url,
      urlUser: cards.owner.html_url,
      comments: cards.comments_url,
    }
  }

  return {getAllCards};
}

export {GitHubServices};
