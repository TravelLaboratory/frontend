import loadable from '@loadable/component';

import { ModalProps } from '@/components/modal/Modal';
import { BlockDetailBudgetModalProps } from '@/components/modal/modalList/BlockDetailBudgetModal';
import { BlockDetailModalProps } from '@/components/modal/modalList/BlockDetailModal';
import { CreateBlockModalProps } from '@/components/modal/modalList/CreateBlockModal';
import { ShareLinkModalProps } from '@/components/modal/modalList/ShareLinkModal';
import { DeleteModalProps as SubmitModalProps } from '@/components/modal/modalList/SubmitModal';

// Loading 컴포넌트 정의
function Loading() {
  return <div>Loading...</div>;
}

const importList = {
  Modal: loadable(() => import('@/components/modal/Modal'), {
    fallback: <Loading />
  }),
  CreateBlock: loadable(() => import('@/components/modal/modalList/CreateBlockModal'), {
    fallback: <Loading />
  }),
  BlockDetail: loadable(() => import('@/components/modal/modalList/BlockDetailModal'), {
    fallback: <Loading />
  }),
  BlockDetailBudget: loadable(() => import('@/components/modal/modalList/BlockDetailBudgetModal'), {
    fallback: <Loading />
  }),
  ShareLink: loadable(() => import('@/components/modal/modalList/ShareLinkModal'), {
    fallback: <Loading />
  }),
  SubmitModal: loadable(() => import('@/components/modal/modalList/SubmitModal'), {
    fallback: <Loading />
  })
};

const modalList = {
  Modal: (props: ModalProps) => {
    return { component: importList.Modal, props };
  },
  CreateBlock: (props: CreateBlockModalProps) => {
    return { component: importList.CreateBlock, props };
  },
  BlockDetail: (props: BlockDetailModalProps) => {
    return { component: importList.BlockDetail, props };
  },
  BlockDetailBudget: (props: BlockDetailBudgetModalProps) => {
    return { component: importList.BlockDetailBudget, props };
  },
  ShareLink: (props: ShareLinkModalProps) => {
    return { component: importList.ShareLink, props };
  },
  SubmitModal: (props: SubmitModalProps) => {
    return { component: importList.SubmitModal, props };
  }
};

export default modalList;
