import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { fetchUser, useAppDispatch, useAppSelector } from "../store";

const SingleUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) =>
    state.users.users.find((user) => user.id === Number(id))
  );
  const userStatus = useAppSelector((state) => state.users.status);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser(Number(id)));
    }
  }, [userStatus, dispatch, id]);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    navigate("/signIn");
  };
  return (
    <>
      {userStatus === "loading" ? (
        <div>Loading...</div>
      ) : !user || userStatus === "failed" ? (
        <div>User not found</div>
      ) : (
        <>
          <div className="about-us">
            <button
              className="sign-out navigate-back"
              onClick={() => navigate("/")}
            >
              Назад
            </button>
            <button
              className="sign-out-mobile navigate-back-mobile"
              onClick={() => navigate("/")}
            >
              <svg
                width="7"
                height="14"
                viewBox="0 0 7 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.83749 14.0013C5.68809 14.0018 5.54048 13.9688 5.4055 13.9048C5.27052 13.8407 5.15161 13.7473 5.05749 13.6313L0.227488 7.63125C0.0804062 7.45232 0 7.22788 0 6.99625C0 6.76463 0.0804062 6.54018 0.227488 6.36125L5.22749 0.361252C5.39723 0.157036 5.64114 0.0286112 5.90556 0.0042315C6.16999 -0.0201482 6.43327 0.0615137 6.63749 0.231252C6.8417 0.400991 6.97013 0.644902 6.99451 0.909329C7.01889 1.17375 6.93723 1.43704 6.76749 1.64125L2.29749 7.00125L6.61749 12.3613C6.73977 12.508 6.81745 12.6868 6.84133 12.8763C6.86521 13.0659 6.83429 13.2583 6.75223 13.4308C6.67018 13.6034 6.54042 13.7488 6.37831 13.8499C6.2162 13.9509 6.02852 14.0035 5.83749 14.0013Z"
                  fill="#F8F8F8"
                />
              </svg>
            </button>
            <div className="single-user-wrapper">
              <img
                className="user-img single-user-img"
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
              />
              <div>
                <h2 className="about-us__title">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="single-user-role">Партнер</p>
              </div>
            </div>
            <button className="sign-out" onClick={handleSignOut}>
              Выход
            </button>
            <button className="sign-out-mobile" onClick={handleSignOut}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.79 13.29C8.18 13.68 8.81 13.68 9.2 13.29L12.79 9.7C12.8827 9.60749 12.9563 9.4976 13.0064 9.37662C13.0566 9.25565 13.0824 9.12597 13.0824 8.995C13.0824 8.86403 13.0566 8.73435 13.0064 8.61338C12.9563 8.4924 12.8827 8.38251 12.79 8.29L9.2 4.7C9.01302 4.51302 8.75943 4.40798 8.495 4.40798C8.23057 4.40798 7.97698 4.51302 7.79 4.7C7.60302 4.88698 7.49798 5.14057 7.49798 5.405C7.49798 5.66943 7.60302 5.92302 7.79 6.11L9.67 8H1C0.45 8 0 8.45 0 9C0 9.55 0.45 10 1 10H9.67L7.79 11.88C7.4 12.27 7.41 12.91 7.79 13.29ZM16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V5C0 5.55 0.45 6 1 6C1.55 6 2 5.55 2 5V3C2 2.45 2.45 2 3 2H15C15.55 2 16 2.45 16 3V15C16 15.55 15.55 16 15 16H3C2.45 16 2 15.55 2 15V13C2 12.45 1.55 12 1 12C0.45 12 0 12.45 0 13V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0Z"
                  fill="#F8F8F8"
                />
              </svg>
            </button>
          </div>
          <div className="single-user-info">
            <p className="single-user-details">
              Экспертный эксперт по вопросам разработки комплексных решений
              финансовых продуктов, включая такие аспекты, как организационная
              структура, процессы, аналитика и ИТ-компоненты. Помогает клиентам
              лучше понимать структуру рисков их бизнеса, улучшать процессы за
              счет применения новейших технологий и увеличивать продажи,
              используя самые современные аналитические инструменты. В работе с
              клиентами недостаточно просто решить конкретную проблему или
              помочь справиться с трудностями. Не менее важно уделять внимание
              обмену знаниями: "Один из самых позитивных моментов — это
              осознание того, что ты помогаешь клиенту перейти на совершенно
              новый уровень компетентности, уверенность в том, что после
              окончания проекта у клиента есть все необходимое, чтобы дальше
              развиваться самостоятельно". Помимо разнообразных проектов для
              клиентов финансового сектора, наш экспертный эксперт ведет
              активную предпринимательскую деятельность — является совладельцем
              сети клиник эстетической медицины в Швейцарии, предлагающей
              инновационный подход к красоте, а также инвестором других
              бизнес-проектов.
            </p>
            <div className="single-user-contact-info">
              <div className="single-user-contact">
                <svg
                  className="single-user-contact-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.554 6.24003L7.17099 2.33503C6.78099 1.88503 6.06599 1.88703 5.61299 2.34103L2.83099 5.12803C2.00299 5.95703 1.76599 7.18803 2.24499 8.17503C5.10661 14.1 9.88503 18.8851 15.806 21.755C16.792 22.234 18.022 21.997 18.85 21.168L21.658 18.355C22.113 17.9 22.114 17.181 21.66 16.791L17.74 13.426C17.33 13.074 16.693 13.12 16.282 13.532L14.918 14.898C14.8482 14.9712 14.7562 15.0195 14.6563 15.0354C14.5564 15.0513 14.4541 15.0339 14.365 14.986C12.1354 13.7021 10.286 11.8503 9.00499 9.61903C8.95702 9.52978 8.93964 9.42726 8.95554 9.32719C8.97144 9.22711 9.01972 9.13502 9.09299 9.06503L10.453 7.70403C10.865 7.29003 10.91 6.65003 10.554 6.23903V6.24003Z"
                    stroke="#512689"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p>+7 (999) 333-44-55</p>
              </div>
              <div className="single-user-contact">
                <svg
                  className="single-user-contact-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 4.5H3C2.60218 4.5 2.22064 4.65804 1.93934 4.93934C1.65804 5.22064 1.5 5.60218 1.5 6V18C1.5 18.3978 1.65804 18.7794 1.93934 19.0607C2.22064 19.342 2.60218 19.5 3 19.5H21C21.3978 19.5 21.7794 19.342 22.0607 19.0607C22.342 18.7794 22.5 18.3978 22.5 18V6C22.5 5.60218 22.342 5.22064 22.0607 4.93934C21.7794 4.65804 21.3978 4.5 21 4.5ZM19.35 6L12 11.085L4.65 6H19.35ZM3 18V6.6825L11.5725 12.615C11.698 12.7021 11.8472 12.7488 12 12.7488C12.1528 12.7488 12.302 12.7021 12.4275 12.615L21 6.6825V18H3Z"
                    fill="#512689"
                  />
                </svg>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleUser;
