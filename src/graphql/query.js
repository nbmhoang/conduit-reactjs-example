// Param order: sortBy/where/search -> skip -> first

export const GET_DATA = `
    query GetAllAuthorsBooksAndCategories($size: Int!, $offset: Int!, $orderBy: String) {
        books: allBooks(orderBy: $orderBy, skip: $offset, first: $size) {
            id
            name
            author {
                name
            }
            image {
                publicUrlTransformed(transformation: {width: "200", height: "300", crop: "pad"})
            }
        }
        authors: allAuthors {
            id
            name
          }
        categories: allCategories {
            id
            name
          }
        _allBooksMeta {
            count
        }
    }
`;
/*
export const GET_BOOKS = `
    query GetBooks($size: Int!, $offset: Int!) {
        allBooks(sortBy: name_ASC, skip: $offset, first: $size) {
            id
            name
            author {
                name
            }
            image {
                publicUrlTransformed(transformation: {width: "200", height: "300", crop: "pad"})
            }
        }
        _allBooksMeta {
            count
        }
    }
`;
*/
export const GET_BOOK = `
    query GetBook($id: ID!) {
        Book(where: {id: $id}) {
            id
            name
            pageNumber
            numberInStorage
            publishDate
            describe
            category {
                name
            }
            author {
                name
            }
            image {
                publicUrlTransformed(transformation: {width: "500", crop: "limit"})
            }
        }
    }
`;
/*
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
*/
export const FILTER_BOOK = `
    query filterBook(
        $name: String
        $author: AuthorWhereInput
        $category: CategoryWhereInput
        $offset: Int!
        $size: Int!
    ) {
        books: allBooks(
            search: $name,
            where: {
                AND: [{ author: $author, category: $category }]
            },
            sortBy: name_ASC,
            skip: $offset,
            first: $size
        ) {
            id
            name
            author {
                id
                name
            }
            image {
                publicUrlTransformed(transformation: {width: "200", height: "300", crop: "pad"})
            }
        }
        _allBooksMeta(
            search: $name,
            where: {
                AND: [{ author: $author, category: $category }]
            }
        ) {
            count
        }
    }
`;