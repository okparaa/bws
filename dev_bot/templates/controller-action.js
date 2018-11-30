    public function __action__Action() {
        $request = $this->getRequest();
        $user = $this->getIdentity();
                
        if ($request->isPost()) {
            $body = $request->getBody();
            return ['message'=> 'success'];
        }
        return [];
    }
// __action__