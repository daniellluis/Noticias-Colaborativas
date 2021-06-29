import { Link } from "react-router-dom";

function Comment({ comment, reactComment }) {
  const fechaCreacion = comment.created_at;
  const fechaFormateada = new Date(fechaCreacion).toLocaleString();

  const avatarImage = comment.avatar
    ? `${process.env.REACT_APP_STATIC}/images/profiles/${comment.avatar}`
    : "/avatar/defaul-profile-image.png";

  return (
    <div className="comment">
      <div className="container-comentario">
        <h2>Publicado por</h2>
        <Link to={`/OtherUserProfile/${comment.id_user}`}>
          <img className="avatar-noticia" src={avatarImage} alt="avatar" />
        </Link>
        <h2>
          <Link to={`/OtherUserProfile/${comment.id_user}`}>
            <span>{comment.name}</span>
          </Link>
          el {fechaFormateada}
        </h2>
      </div>
      <p>{comment.comment}</p>
      <div className="reaction-comment">
        <button onClick={() => reactComment(comment.id, true)}>
          <img
            className="emoji-comment"
            src="/happy-emoji.png"
            alt="happy-emoji"
          />
        </button>
        <span>{comment.comment_like}</span>
        <button onClick={() => reactComment(comment.id, false)}>
          <img
            className="emoji-comment"
            src="/angry-emoji.png"
            alt="angry-emoji"
          />
        </button>
        <span>{comment.comment_dislike}</span>
      </div>
    </div>
  );
}

export default Comment;
