import { format, formatRelative } from 'date-fns';
import { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { ImSpinner6 } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import commentApi from '~/apis/comment.api';
import SectionWrapper from '~/components/common/SectionWrapper';
import { routesGeneration } from '~/configs/routes.configs';
import tmdbConfigs from '~/configs/tmdb.configs';
import { setGlobalLoading } from '~/redux/features/globalSlice';

const CommentItem = ({ comment, onRemove }) => {
  const [onLoading, setOnLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = async (e) => {
    // e.stopImmediatePropagation(); // không xóa và đến liên kết
    // e.stopPropagation(); // xóa xong đến liên kết
    e.preventDefault(); // xóa và không đến liên kết

    if (onLoading) return;

    setOnLoading(true);
    const { response, err } = await commentApi.deleteComment({ commentId: comment.id }); // handle remove api
    setOnLoading(false);

    console.log(response, err);

    if (response) {
      onRemove(comment.id); // handle remove localState
      toast.success('Remove comment successfully');
    }
    if (err) toast.error(err.message);
  };

  const getTimeComment = (timestamp) => {
    // Same in CommentSection
    const fullDate = format(new Date(timestamp), 'MM/dd/yyyy');
    const relative = formatRelative((new Date(timestamp), Date.now()), new Date());
    return `${fullDate} - ${relative}`;
  };

  return (
    <Link to={routesGeneration.mediaDetail(comment.mediaType, comment.mediaId)}>
      <div
        className={`relative flex flex-col gap-4 border-b border-solid border-slate-300/50 p-2 text-skin-contrast hover:bg-skin-paper md:flex-row md:gap-8 ${
          onLoading ? 'opacity-50' : 'opacity-100'
        }`}
      >
        {/* Poster */}
        <div className="hidden min-w-[100px] flex-shrink-0 md:block">
          <div
            // @ts-ignore
            style={{ '--backdrop-poster': `url(${tmdbConfigs.posterPath(comment.mediaPoster)}` }}
            className="backdrop-poster pt-[160%]"
          />
        </div>
        {/* Content */}
        <div className="flex flex-1 flex-col gap-2">
          <h4 className="line-clamp-1 pr-0 text-2xl font-bold md:pr-28">{comment.mediaTitle}</h4>
          {/* FIXME: using updatedAt if has edit api */}
          <span className="text-xs">{getTimeComment(comment.createdAt)}</span>
          <div>{comment.content}</div>
        </div>
        {/* Remove Btn */}
        <div className="relative w-full hover:opacity-80 md:absolute md:right-2 md:top-4 md:w-fit">
          <button
            className={`ml-auto flex items-center gap-1 rounded bg-skin-primary p-1.5 text-white ${
              onLoading ? 'bg-slate-500' : 'bg-skin-primary'
            }`}
            onClick={handleRemove}
          >
            <span>
              <span>{onLoading ? <ImSpinner6 size={24} className="animate-spin" /> : <BiTrash size={24} />}</span>
            </span>
            <span>Remove</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

function Comments() {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const itemsPerPage = 3;

  const dispatch = useDispatch();

  useEffect(() => {
    const getCommentsOfUser = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await commentApi.getListOfUser();
      dispatch(setGlobalLoading(false));

      console.log(response, err);

      if (response) {
        setComments([...response.data]);
        setFilteredComments([...response.data].slice(0, page * itemsPerPage));
        setCount(response.data.length);
      }
      if (err) toast.error(err.message);
    };
    getCommentsOfUser();
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
    setFilteredComments(comments.slice(0, (page + 1) * itemsPerPage));
  };

  const handleRemoveInLocalState = (commentId) => {
    const newComments = comments.filter((e) => e.id !== commentId);
    setComments(comments.filter((e) => e.id !== commentId));
    setFilteredComments(newComments.slice(0, page * itemsPerPage));
    setCount(count - 1);
  };

  return (
    <div className="main-content">
      <SectionWrapper title={`Your comments (${count})`}>
        {filteredComments.map((comment, id) => (
          <CommentItem key={id} comment={comment} onRemove={handleRemoveInLocalState} />
        ))}
        {/* Load more */}
        {filteredComments.length < comments.length && (
          <div className="text-center">
            <button className="load-more" onClick={handleLoadMore}>
              load more
            </button>
          </div>
        )}
      </SectionWrapper>
    </div>
  );
}

export default Comments;
