const AddButton = ({ isAuthor }) => {
    return (
        isAuthor && <button>+ Add Post</button>
    );
};

export default AddButton;
