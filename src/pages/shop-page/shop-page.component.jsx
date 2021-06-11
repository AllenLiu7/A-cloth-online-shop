import React, { Component, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchCollections } from '../../redux/shop-items/shop-item.reducer';
import { selectIsCollectionsLoaded } from '../../redux/shop-items/shop-item.selectors';

import CollectionPage from '../collection-page/collection-page.component';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// class ShopPage extends Component {
//   //putting fetch action in componentDidmount() will not pass down the fetched data when the site first render. Collections will be null.
//   // so we add a spinner HOC to stop the rendering to wait for the fetching data.
//   // if the data(object) exsist, we skip the spinner.

//   componentDidMount() {
//     this.props.fetchCollections();
//   }

//   render() {
//     const { match, isCollectionsLoaded } = this.props;

//     return (
//       <div className='shop-page'>
//         <Route
//           exact
//           path={`${match.path}`}
//           render={(props) => (
//             //...props are history objects
//             <CollectionsOverviewWithSpinner
//               //if is Loading is true, which means selectIsCollectionLoaded is false, which means the collections is null.
//               //here we do not use the isFetching value, because it has to be false initially. So that the loading page will not render.
//               isLoading={!isCollectionsLoaded}
//               {...props}
//             />
//           )}
//         />
//         <Route
//           path={`${match.path}/:collectionId`}
//           render={(props) => (
//             <CollectionPageWithSpinner
//               isLoading={!isCollectionsLoaded}
//               {...props}
//             />
//           )}
//         />
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => ({
//   fetchCollections: () => dispatch(fetchCollections()),
// });

// const mapStateToProps = (state) => ({
//   //isFetching: selectIsCollectionFetching(state),
//   isCollectionsLoaded: selectIsCollectionsLoaded(state),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

const ShopPage = ({ match }) => {
  const dispatch = useDispatch();
  const isCollectionsLoaded = useSelector(selectIsCollectionsLoaded);

  useEffect(() => {
    dispatch(fetchCollections());
  });

  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          //...props are history objects
          <CollectionsOverviewWithSpinner
            //if is Loading is true, which means selectIsCollectionLoaded is false, which means the collections is null.
            //here we do not use the isFetching value, because it has to be false initially. So that the loading page will not render.
            isLoading={!isCollectionsLoaded}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner
            isLoading={!isCollectionsLoaded}
            {...props}
          />
        )}
      />
    </div>
  );
};

export default ShopPage;
