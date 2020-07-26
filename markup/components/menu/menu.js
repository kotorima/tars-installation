$(function () {
    let menuItem = '.menu__item',
        menuItemActive = 'menu__item--active';

    function setUrlParams(value) {
        let paramName = 'category',
            res = '?' + paramName + '=' + value;

        window.history.pushState('1', 'Title', res);
        return false;
    }

    function preloader() {
        let $preloader = $('.product-list__preloader'),
            preloaderHide = 'product-list__preloader--hide',
            $content = $('.product-list__content'),
            contentHide = 'product-list__content--hide';

        $preloader.toggleClass(preloaderHide);
        $content.toggleClass(contentHide);
    }

    function renderProducts(res) {
        let $poductListContent = $('.product-list__content'),
            blockClass = 'product-card',
            imgWrapperClass = blockClass + '__img-wr',
            imgClass = blockClass + '__img',
            descriptionClass = blockClass + '__description',
            textWrapperClass = blockClass + '__description-text-wr',
            textClass = blockClass + '__description-text';

        if ($('.' + blockClass).length > 0) {
            $('.' + blockClass).remove();
        }

        for (const item of res.productList) {
            $poductListContent.append('<a href="' + item.link + '" class="' + blockClass + '"><div class="' + imgWrapperClass + '"><img class="' + imgClass + '" src="' + item.img + '" alt=""></div><div class="' + descriptionClass + '"><div class="' + textWrapperClass + '"><div class="' + textClass + '">' + item.name + '</div></div></div></a>');
        }
    }

    function request(params) {
        $.ajax({
            type: 'GET',
            url: 'static/components-assets/product-list/response.json',
            data: {
                category: params
            },
            success: function (res) {
                setUrlParams(params);
                let $productListEmpty = $('.product-list__empty'),
                    productListEmptyShowClass = 'product-list__empty--show';

                if (res.status === 'ok') {
                    $productListEmpty.removeClass(productListEmptyShowClass);
                    renderProducts(res);
                    preloader();
                } else {
                    preloader();
                    $productListEmpty.addClass(productListEmptyShowClass);
                }
            }
        });
    }

    function initProduct() {
        let urlParams = window.location.search,
            param;

        if (urlParams !== '') {
            let params = urlParams.split('=');
            param = params[1];
        } else {
            param = $($(menuItem)[0]).attr('data-category-id');
        }

        request(param);
        $(menuItem + '[data-category-id="' + param + '"]').addClass(menuItemActive);
    }

    function changeCategory() {
        $(menuItem).on('click', function () {
            preloader();

            $(menuItem).removeClass(menuItemActive);
            $(this).addClass(menuItemActive);

            let categoryId = $(this).attr('data-category-id');
            setTimeout(() => {
                request(categoryId);
            }, 250);
        });
    }

    initProduct();
    changeCategory();
});
