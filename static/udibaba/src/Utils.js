import $ from 'jquery';
import jQuery from 'jquery';
// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;

export function postApiRequest(uri, data, onSuccessCallback,
                               onFailureCallback, callbackParmas) {
  data = jsonStringfy(data)
  postData(uri, data, 'POST', onSuccessCallback, onFailureCallback, callbackParmas)
}

/**
 * @module Utils
 * @params {String} Url - Provides the post url
 * @params {Object} data - The object that represents the contents of the
 * request being sent
 */
export function getApiRequest(uri, id, onSuccessCallback, onFailureCallback,
                              interval) {
  postData(uri, id, 'GET', onSuccessCallback, onFailureCallback, interval)
}

function jsonStringfy(data) {
  return JSON.stringify(data)
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


function postData(uri, data, methodType, onSuccess, onFailure, callbackParmas=null) {
  const csrftoken = getCookie('csrftoken');
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      if (!this.crossDomain) {
          xhr.setRequestHeader('X-CSRFToken', csrftoken);
      }
    }
  });
  $.ajax({
    url: uri,
    method: methodType,
    contentType: 'application/json',
    data: data,
    success: function (response) {
      if (onSuccess) {
        if(callbackParmas){
          onSuccess(response, callbackParmas)
        }else {
          onSuccess(response)
        }

      }
    },

    error: function (error) {
      if (onFailure) {
        onFailure(error)
      }
    }
  })
}
