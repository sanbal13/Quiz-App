import { Link } from 'react-router-dom';

function Home(props) {
  let data = props.data;
  return (
    <ul className="flex wrap">
      {data.map((category) => (
        <li key={category.id} className="flex-30">
          <h4>{category.name}</h4>
          <p>{`This quiz tests your basic knowledge in ${category.name}`}</p>
          <Link to={`/quiz/${category.name}`} className="take-quiz-btn">
            Take Quiz
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Home;
