document.addEventListener("DOMContentLoaded", () => {
    const wtdWatchMetadata = document.querySelector(".wtd-watch-metadata-html-tag");
    const commentCreationForm = document.querySelector("#comment-creation-form");
    const comments = document.querySelectorAll("#contents.wtd-comments.wtd-item-section-renderer");
    const commentInput = commentCreationForm.querySelector("#contenteditable-root.wt-formatted-string");



    function deleteCommentElement(commentId) {
        const commentElementToBeDeleted = document.querySelector(`#comment[comment-id='${commentId}']`);
        commentElementToBeDeleted.parentElement.remove();
    };
    /**
     * @param {String} commentId
     * @param {String} commentText
     * @param {Object} comment_owner
     */
    function createCommentElement(commentId, commentText, comment_owner) {
        const originalCommentElement = document.querySelector("wtd-comment-thread-renderer.wtd-item-section-renderer");
        const clonedElementForThisComment = originalCommentElement.cloneNode(true);

        clonedElementForThisComment
            .querySelector("#comment.wtd-comment-thread-renderer")
            .setAttribute("comment-id", String(commentId));
        clonedElementForThisComment
            .querySelector("#author-thumbnail-button")
            .setAttribute("aria-label", String(comment_owner.user_channel.channel_handle));
        clonedElementForThisComment
            .querySelector("#img.wt-img-shadow")
            .setAttribute("src", String(comment_owner.avatar));
        clonedElementForThisComment
            .querySelector("#author-text")
            .setAttribute("href", String(comment_owner.user_channel.channel_handle));
        clonedElementForThisComment
            .querySelector("#author-text span").textContent = String(comment_owner.user_channel.channel_handle);
        clonedElementForThisComment
            .querySelector("#content-text span").textContent = commentText;
        
        document
            .querySelector("#contents.wtd-comments.wtd-item-section-renderer")
            .prepend(clonedElementForThisComment);
    };

    async function handleCommentSubmit(event) {
        event.preventDefault();
        
        const commentText = commentInput.textContent;
        const videoId = wtdWatchMetadata.getAttribute("video-id");
    
        if (commentText === "") return;
    
        const commentApiResponse = await fetch(
            `/api/${videoId}/comment`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ commentText }),
            }                 
        );
    
        if (commentApiResponse.status === 201) {
            commentInput.textContent = "";
            
            const {
                newCommentId, userWhoWriteThisComment
            } = await commentApiResponse.json();

            createCommentElement(newCommentId, commentText, userWhoWriteThisComment);
        };
    }

    if (commentCreationForm) {
        commentCreationForm.addEventListener("submit", handleCommentSubmit);
    };
    comments.forEach((comment) => {
        const commentDeleteButton = comment.querySelector("#delete-button-end button");
        if (commentDeleteButton) {
            commentDeleteButton.addEventListener("click", async () => {
                const commentId = comment.querySelector("#comment.wtd-comment-thread-renderer").getAttribute("comment-id");
                const response = await fetch(
                    `/api/delete_this_comment/${commentId}`,
                    {
                        method: "DELETE",
                    }
                );
                if (response.status === 200) {
                    deleteCommentElement(commentId);
                };
            });
        };
    });
});