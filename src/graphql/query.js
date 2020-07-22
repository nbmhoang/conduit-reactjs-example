export const GET_BOOKS = `
    query GetBooks($size: Int!, $offset: Int!) {
        allBooks(first: $size, skip: $offset , sortBy: name_ASC) {
            id
            name
            author {
                name
            }
            image {
                publicUrlTransformed(transformation: {width: "200", height: "300", crop: "pad"})
            }
        }
        _allBooksMeta(first: 10) {
            count
        }
    }
`;

export const GET_BOOK = `
    query GetBook($id: ID!) {
        Book(where: {id: $id}) {
            id
            name
            pageNumber
            numberInStorage
            publishDate
            describe
            author {
                name
            }
            image {
                publicUrlTransformed(transformation: {width: "200", height: "500", crop: "pad"})
            }
        }
    }
`;

export const GET_CATEGORIES = `
    {
        allCategories {
            id
            name
        }
    }
`;

export const GET_AUTHORS = `
    {
        allAuthors {
            id
            name
        }
    }
`;

export const FILTER_BOOK = `
    query filterBook(
        $name: String
        $author: AuthorWhereInput
        $category: CategoryWhereInput
    ) {
        allBooks(
            first: 10,
            search: $name,
            where: {
                AND: [{ author: $author, category: $category }]
            },
            sortBy: name_ASC
        ) {
            id
            name
            author {
                id
                name
            }
            image {
                publicUrlTransformed(transformation: {height: "300", crop: "limit"})
            }
        }
        _allBooksMeta(
            first: 10,
            search: $name,
            where: {
                AND: [{ author: $author, category: $category }]
            }
        ) {
            count
        }
    }
`;